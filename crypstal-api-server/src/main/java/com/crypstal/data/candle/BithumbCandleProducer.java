package com.crypstal.data.candle;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.crypstal.api.exchange.UpbitExchangeAPI.HttpMethodType;
import com.crypstal.ta4j.MutableBaseBar;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lombok.Data;

//TODO class BithumbCandleProducer extends CandleProducer
@Service
public class BithumbCandleProducer extends CandleProducer<MutableBaseBar> {
	
	@Autowired
	private CandleBroker candleBroker;
	
	private long lastContNo;
	
	public BithumbCandleProducer() {
		lastContNo = 0;
	}
	
	public String request() {
        //String requestUrl = "https://api.bithumb.com/public/ticker/BTC";
		String requestUrl = "https://api.bithumb.com/public/transaction_history/BTC";

        HttpsURLConnection conn;
        BufferedReader reader = null;
        InputStreamReader isr = null;

        try {
            final URL url = new URL(requestUrl);
            conn = (HttpsURLConnection)url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("charset", "utf-8");

            final int responseCode = conn.getResponseCode();
      
            if (responseCode == 200)
                isr = new InputStreamReader(conn.getInputStream());
            else
                isr = new InputStreamReader(conn.getErrorStream());

            reader = new BufferedReader(isr);
            final StringBuffer buffer = new StringBuffer();
            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            
            return buffer.toString();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) try { reader.close(); } catch (Exception ignore) { }
            if (isr != null) try { isr.close(); } catch (Exception ignore) { }
        }

        return null;
    }


	@Scheduled(fixedDelay=1000)
	@Override
	public void execute() {
		String response = request();
		
        BithumbResponse bithumbResponse = gson.fromJson(response, BithumbResponse.class);
        List<TransactionHistory> data = bithumbResponse.getData();
        
        ZonedDateTime time = null;
        long id;
        double price, unitVolume;
        
        DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        for (TransactionHistory tr : data) {
        	if (tr.getCont_no() <= lastContNo) {
        		break;
        	}
        	
        	id = tr.getCont_no();
        	time = LocalDateTime.parse(tr.getTransaction_date(), pattern).atZone(ZoneId.of("Asia/Seoul"));
        	price = tr.getPrice();
        	unitVolume = tr.getUnits_traded();
        	
        	//System.out.println(tr);
        	
        	candleBroker.offer("bithumbBTC", time, price, unitVolume);
        	lastContNo = tr.getCont_no();
        }
	}
	
	@Data
	class BithumbResponse {
		private String status;
		private List<TransactionHistory> data;
	}
	
	@Data
	class TransactionHistory {
		private long cont_no;
		private String transaction_date;
		private double units_traded;
		private double price;
		private double total;
	}
}
