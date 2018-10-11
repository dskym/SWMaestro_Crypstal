package com.crypstal.api.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.ta4j.core.Trade;
import org.ta4j.core.TradingRecord;

import com.crypstal.api.backtest.BudgetaryTradingRecord;
import com.crypstal.api.backtest.TradingResult;
import com.crypstal.api.model.BaseStrategyTradingBot;
import com.crypstal.api.model.Bot;
import com.crypstal.api.model.TradingBotConfiguration;
import com.crypstal.api.service.BacktestService;
import com.crypstal.api.service.BotService;
import com.crypstal.api.service.TradingService;

@Controller
@RequestMapping(path="/v1/bots", produces = "application/json; charset=utf-8")
public class BotController extends AbstractController {
	
	public static Logger logger = Logger.getLogger(BotController.class);
	
	@Autowired
	private TradingService tradingService;
	
	@Autowired
	private BacktestService backtestService;
	
	@Autowired
	private BotService botService;
	
	@GetMapping
	@ResponseBody
	public ResponseEntity<String> listBots() throws Exception {
		List<TradingBotConfiguration> userBotList = botService.getByUser();
		System.out.println(userBotList);
		return new ResponseEntity<String>(getGson().toJson(userBotList), HttpStatus.OK);
	}
	
	@PostMapping()
	@ResponseBody
	public ResponseEntity<String> create(@RequestBody String botName) throws Exception {
		Bot bot = botService.createByDefault(botName);
		botService.store(bot);
		
		return new ResponseEntity<String>(getGson().toJson(bot), HttpStatus.OK);
	}
	
	@PutMapping("/{botId}")
	@ResponseBody
	public ResponseEntity<String> update(@PathVariable int botId) throws Exception {
		
		return new ResponseEntity<String>(getGson().toJson(null), HttpStatus.OK);
	}
	
	@DeleteMapping()
	@ResponseBody
	public ResponseEntity<String> delete() throws Exception {
		
		return null;
	}
	
	@PutMapping("/{botId}/startup")
	@ResponseBody
	public ResponseEntity<String> startup(@PathVariable int botId) throws Exception {
		tradingService.register(botId);
		return new ResponseEntity<String>(getGson().toJson(null), HttpStatus.OK);
	}
	
	@PutMapping("/{botId}/shutdown")
	@ResponseBody
	public ResponseEntity<String> shutdown(@PathVariable int botId) throws Exception {
		return new ResponseEntity<String>(getGson().toJson(null), HttpStatus.OK);
	}
	
	@GetMapping("/{botId}/backtest")
	@ResponseBody
	public ResponseEntity<String> backtest(@PathVariable int botId,
			@RequestParam String from,
			@RequestParam String to,
			@RequestParam double asset,
			@RequestParam double fee,
			@RequestParam double slippage) throws Exception {
		
		BaseStrategyTradingBot bot = botService.getById(botId);
		
		TradingRecord history = backtestService.backtest(bot, from, to, asset, fee, slippage);
		TradingResult result = backtestService.result(from, to, asset, fee, slippage, bot, (BudgetaryTradingRecord)history);
		
		Map<String, Object> json = new HashMap<>();
		json.put("history", history.getTrades());
		json.put("result", result);
		
		return new ResponseEntity<String>(getGson().toJson(json), HttpStatus.OK);
	}

}
