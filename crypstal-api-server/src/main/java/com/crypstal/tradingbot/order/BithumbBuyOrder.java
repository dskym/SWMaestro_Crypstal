package com.crypstal.tradingbot.order;

import java.util.HashMap;

import com.crypstal.api.bithumb.Api_Client;
import com.crypstal.tradingbot.TradingBot;

public class BithumbBuyOrder implements Order {
	
	private String apiKey;
	
	private String secretKey;
	
	private String orderCurrency;
	
	private String paymentCurrency;
	
	private float units;
	
	private int price;
	
	private String orderType;
	
	public BithumbBuyOrder(String apiKey, String secretKey, String orderCurrency, String paymentCurrency, float units,
			int price, String orderType) {
		super();
		this.apiKey = apiKey;
		this.secretKey = secretKey;
		this.orderCurrency = orderCurrency;
		this.paymentCurrency = paymentCurrency;
		this.units = units;
		this.price = price;
		this.orderType = orderType;
	}

	@Override
	public void place() {
		Api_Client api = new Api_Client(apiKey, secretKey);
		HashMap<String, String> rgParams = new HashMap<String, String>();
		rgParams.put("order_currency", orderCurrency);
		rgParams.put("payment_currency", paymentCurrency);
		rgParams.put("units", Float.toString(units)); // 0.1 이상
		rgParams.put("price", Integer.toString(price)); // 최소 714,500 원 이상(500원 단위로) 
		rgParams.put("type", orderType);
		
		try {
			String result = api.callApi("/trade/place", rgParams);
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String args[]) {
		BithumbBuyOrder order = new BithumbBuyOrder("503fb6ea8d6512afbd235898e73b2677", "e90737365b47b3adf439d2799ef2ab53",
				"BTC", "KRW", 0.1f, 714500, "bid");
		order.place();
	}
}
	
	
// connect key : 503fb6ea8d6512afbd235898e73b2677
// secret key : e90737365b47b3adf439d2799ef2ab53
