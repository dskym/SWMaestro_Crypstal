package com.crypstal.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.ta4j.core.Order.OrderType;

import com.crypstal.api.http.request.StrategyUpdateHttpRequest;
import com.crypstal.api.service.RuleService;

@Controller
@RequestMapping(path="/v1/rules", produces = "application/json; charset=utf-8")
public class RuleController extends AbstractController {
	
	public static Logger logger = Logger.getLogger(RuleController.class);
	
	@Autowired
	private RuleService ruleService;
	
	@GetMapping()
	@ResponseBody
	public ResponseEntity<String> get(@RequestParam int botId) 
			throws Exception {
		
		List<String> entryRuleList = ruleService.getSerializedByBot(botId, OrderType.BUY);
		List<String> exitRuleList = ruleService.getSerializedByBot(botId, OrderType.SELL);
		
		Map<String, List<String>> entryAndExitRules = new HashMap<>();
		entryAndExitRules.put("BUY", entryRuleList);
		entryAndExitRules.put("SELL", exitRuleList);
		
		return new ResponseEntity<String>(getGson().toJson(entryAndExitRules), HttpStatus.OK);
	}
	
	@PutMapping()
	@ResponseBody
	public ResponseEntity<String> update(@RequestParam int botId, @RequestBody Map<String, List<String>> req) 
			throws Exception {
		System.out.println(req);
		return new ResponseEntity<String>(getGson().toJson(req), HttpStatus.OK);
	}

}
