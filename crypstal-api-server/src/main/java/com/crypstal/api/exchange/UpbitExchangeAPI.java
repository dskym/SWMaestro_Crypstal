package com.crypstal.api.exchange;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.ta4j.core.BaseBar;
import org.ta4j.core.BaseTimeSeries;
import org.ta4j.core.TimeSeries;

import com.crypstal.api.model.MarketCondition;
import com.crypstal.api.model.Ticker;
import com.crypstal.gson.typeadapter.LocalDateTimeTypeAdapter;
import com.crypstal.gson.typeadapter.MarketConditionTypeAdapter;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Component
@Qualifier("upbitExchangeAPI")
public class UpbitExchangeAPI extends AbstractExchangeAPI {
	public enum HttpMethodType { POST, GET, DELETE }
	
	private static final String EXCHANGE_NAME = "UPBIT";

    private static final String API_SERVER_HOST  = "https://api.upbit.com";

    private static final String CANDLES_MINUTES_PATH = "/v1/candles/minutes";
    private static final String CANDLES_DAYS_PATH = "/v1/candles/days?";
    private static final String TICKER_PATH = "/v1/ticker";
    private static final String MARKET_PATH = "/v1/market/all";
    
    private static final String USER_SIGNUP_PATH = "/v1/user/signup";
    private static final String USER_UNLINK_PATH = "/v1/user/unlink";
    private static final String USER_LOGOUT_PATH = "/v1/user/logout";
    private static final String USER_ME_PATH = "/v1/user/me";
    private static final String USER_UPDATE_PROFILE_PATH = "/v1/user/update_profile";
    private static final String USER_IDS_PATH = "/v1/user/ids";

    private static final String STORY_PROFILE_PATH = "/v1/api/story/profile";
    private static final String STORY_ISSTORYUSER_PATH = "/v1/api/story/isstoryuser";
    private static final String STORY_MYSTORIES_PATH = "/v1/api/story/mystories";
    private static final String STORY_MYSTORY_PATH = "/v1/api/story/mystory";
    private static final String STORY_DELETE_MYSTORY_PATH = "/v1/api/story/delete/mystory";
    private static final String STORY_POST_NOTE_PATH = "/v1/api/story/post/note";
    private static final String STORY_POST_PHOTO_PATH = "/v1/api/story/post/photo";
    private static final String STORY_LINKINFO_PATH = "/v1/api/story/linkinfo";
    private static final String STORY_POST_LINK_PATH = "/v1/api/story/post/link";

    private static final String PUSH_REGISTER_PATH = "/v1/push/register";
    private static final String PUSH_TOKENS_PATH = "/v1/push/tokens";
    private static final String PUSH_DEREGISTER_PATH = "/v1/push/deregister";
    private static final String PUSH_SEND_PATH = "/v1/push/send";

    //private static final ObjectMapper JACKSON_OBJECT_MAPPER = new ObjectMapper();
    private static final Gson GSON = new Gson();
    private static final String PROPERTIES_PARAM_NAME = "properties";
    
    

    private static final List<String> adminApiPaths = new ArrayList<String>();

    static {
        adminApiPaths.add(USER_IDS_PATH);
        adminApiPaths.add(PUSH_REGISTER_PATH);
        adminApiPaths.add(PUSH_TOKENS_PATH);
        adminApiPaths.add(PUSH_DEREGISTER_PATH);
        adminApiPaths.add(PUSH_SEND_PATH);
    }
    
    private List<Map<String, Object>> jsonList;
    private Class<? extends List<Map<String, Object>>> classOfJsonList;
    private final GsonBuilder gsonBuilder;
    private final Gson gson;
    
    {
    	jsonList = new ArrayList<>();
    	classOfJsonList = (Class<? extends List<Map<String, Object>>>) jsonList.getClass();

    	// gson 설정
    	gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter())
        	.registerTypeAdapter(MarketCondition.class, new MarketConditionTypeAdapter());
        gsonBuilder.setPrettyPrinting();
        gson = gsonBuilder.create();
    }

    private String accessToken;
    private String adminKey;
    
    public void setAccessToken(final String accessToken) {
        this.accessToken = accessToken;
    }

    public void setAdminKey(final String adminKey) {
        this.adminKey = adminKey;
    }
    
    public String getCandles(int unit, final Map<String, String> params) {
    	String candle_minutes_path = new StringBuilder(CANDLES_MINUTES_PATH).append(unit).toString();
    	
    	return request(HttpMethodType.GET, CANDLES_DAYS_PATH, mapToQueryStr(params));
    }
    
    public String getTicker(final Map<String, String> params) {
    	return request(HttpMethodType.GET, TICKER_PATH, mapToQueryStr(params));
    }
    
    public String getMarkets() {
    	return request(HttpMethodType.GET, MARKET_PATH, null);
    }

    public String signup() {
        return request(HttpMethodType.POST, USER_SIGNUP_PATH);
    }

    public String signup(final Map<String, String> params) {
        return request(HttpMethodType.POST, USER_SIGNUP_PATH, PROPERTIES_PARAM_NAME + "=" + mapToJsonStr(params));
    }

    public String unlink() {
        return request(HttpMethodType.POST, USER_UNLINK_PATH);
    }

    public String logout() {
        return request(HttpMethodType.POST, USER_LOGOUT_PATH);
    }

    public String me() {
        return request(USER_ME_PATH);
    }

    public String updatProfile(final Map<String, String> params) {
        return request(HttpMethodType.POST, USER_UPDATE_PROFILE_PATH, PROPERTIES_PARAM_NAME + "=" + mapToJsonStr(params));
    }

    public String getUserIds() {
        return request(USER_IDS_PATH);
    }

    public String getUserIds(final Map<String, String> params) {
        return request(HttpMethodType.GET, USER_IDS_PATH, mapToParams(params));
    }

    public String isStoryUser() {
        return request(STORY_ISSTORYUSER_PATH);
    }

    public String storyProfile() {
        return request(STORY_PROFILE_PATH);
    }

    public String postNote(final Map<String, String> params) {
        return request(HttpMethodType.POST, STORY_POST_NOTE_PATH, mapToParams(params));
    }

    public String postLink(final Map<String, String> params) {
        return request(HttpMethodType.POST, STORY_POST_LINK_PATH, mapToParams(params));
    }

    public String postPhoto(final Map<String, String> params) {
        return request(HttpMethodType.POST, STORY_POST_PHOTO_PATH, mapToParams(params));
    }

    public String getMyStory(final Map<String, String> params) {
        return request(HttpMethodType.GET, STORY_MYSTORY_PATH, mapToParams(params));
    }

    public String getMyStories() {
        return request(STORY_MYSTORIES_PATH);
    }

    public String getMyStories(final Map<String, String> params) {
        return request(HttpMethodType.GET, STORY_MYSTORIES_PATH, mapToParams(params));
    }

    public String deleteMyStory(final String id) {
        return request(HttpMethodType.DELETE, STORY_DELETE_MYSTORY_PATH, "?id=" + id);
    }

    public String deleteMyStory(final Map<String, String> params) {
        return request(HttpMethodType.DELETE, STORY_DELETE_MYSTORY_PATH, mapToParams(params));
    }

    public String getLinkInfo(String url) {
        return request(HttpMethodType.GET, STORY_LINKINFO_PATH, "?url=" + url);
    }

    
    public String sendPush(final Map<String, String> params) {
        return request(HttpMethodType.POST, PUSH_SEND_PATH, mapToParams(params));
    }

    public String request(final String apiPath) {
        return request(HttpMethodType.GET, apiPath, null);
    }

    public String request(final HttpMethodType httpMethod, final String apiPath) {
        return request(httpMethod, apiPath, null);
    }

    public String request(HttpMethodType httpMethod, final String apiPath, final String params) {

        String requestUrl = API_SERVER_HOST + apiPath;
        if (httpMethod == null) {
            httpMethod = HttpMethodType.GET;
        }
        if (params != null && params.length() > 0
                && (httpMethod == HttpMethodType.GET || httpMethod == HttpMethodType.DELETE)) {
            requestUrl += params;
        }

        HttpsURLConnection conn;
        OutputStreamWriter writer = null;
        BufferedReader reader = null;
        InputStreamReader isr = null;

        try {
            final URL url = new URL(requestUrl);
            conn = (HttpsURLConnection) url.openConnection();
            conn.setRequestMethod(httpMethod.toString());

            if (adminApiPaths.contains(apiPath)) {
                conn.setRequestProperty("Authorization", "KakaoAK " + this.adminKey);
            } else {
                conn.setRequestProperty("Authorization", "Bearer " + this.accessToken);
            }

            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("charset", "utf-8");

            if (params != null && params.length() > 0 && httpMethod == HttpMethodType.POST) {
                conn.setDoOutput(true);
                writer = new OutputStreamWriter(conn.getOutputStream());
                writer.write(params);
                writer.flush();
            }

            final int responseCode = conn.getResponseCode();
            System.out.println(String.format("\nSending '%s' request to URL : %s", httpMethod, requestUrl));
            System.out.println("Response Code : " + responseCode);
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
            //System.out.println(buffer.toString());
            return buffer.toString();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) try { writer.close(); } catch (Exception ignore) { }
            if (reader != null) try { reader.close(); } catch (Exception ignore) { }
            if (isr != null) try { isr.close(); } catch (Exception ignore) { }
        }

        return null;
    }

    public String urlEncodeUTF8(String s) {
        try {
            return URLEncoder.encode(s, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new UnsupportedOperationException(e);
        }
    }

    public String mapToParams(Map<String, String > map) {
        StringBuilder paramBuilder = new StringBuilder();
        for (String key : map.keySet()) {
            paramBuilder.append(paramBuilder.length() > 0 ? "&" : "");
            paramBuilder.append(String.format("%s=%s", urlEncodeUTF8(key),
                    urlEncodeUTF8(map.get(key).toString())));
        }
        return paramBuilder.toString();
    }

    public String mapToJsonStr(Map<String, String > map) {
        //return JACKSON_OBJECT_MAPPER.writeValueAsString(map);
        return GSON.toJson(map);
    }
    
    public String mapToQueryStr(Map<String, String > map) {
    	StringBuilder sb = new StringBuilder("?");
    	
    	for(String key : map.keySet()) {
    		sb.append(key);
    		sb.append("=");
    		sb.append(map.get(key));
    		sb.append("&");
    	}
    	
        return sb.toString();
    }

	@Override
	public List<String> getMarketList() {
		String response = request(HttpMethodType.GET, MARKET_PATH, null);
		jsonList = gson.fromJson(response, classOfJsonList);
		
		List<String> marketIdList = new ArrayList<>();
		for (Map<String, Object> item : jsonList) {
			marketIdList.add((String)item.get("market"));
		}
		return marketIdList;
	}

	@Override
	public Ticker getTicker(String base, String crypto) {
		Ticker ticker = new Ticker(EXCHANGE_NAME, null, LocalDateTime.now());
		
		List<MarketCondition> marketConditionList = new ArrayList<>();
		String[] baseAndCrypto = null;
		for (String marketId : getMarketList()) {
			baseAndCrypto = marketId.split("-");
			if (base == null && crypto == null) {
				marketConditionList.add(getMarketCondition(marketId));
			} else if (base != null && baseAndCrypto[0].equals(base) && crypto == null) {
				marketConditionList.add(getMarketCondition(marketId));
			} else if (base == null && crypto != null && baseAndCrypto[1].equals(crypto)) {
				marketConditionList.add(getMarketCondition(marketId));
			} else if (base != null && baseAndCrypto[0].equals(base) && crypto != null && baseAndCrypto[1].equals(crypto)) {
				marketConditionList.add(getMarketCondition(marketId));
			}
		}
		
		ticker.setMarketConditionList(marketConditionList);
		return ticker;
	}

	@Override
	public MarketCondition getMarketCondition(String marketId) {
		StringBuilder queryString = new StringBuilder("?markets=").append(marketId);
		String response = request(HttpMethodType.GET, TICKER_PATH, queryString.toString());
		
		MarketCondition[] marketConditions = gson.fromJson(response, MarketCondition[].class);
		MarketCondition mc = marketConditions[0];
		
		return mc;
	}

	@Override
	public TimeSeries getCandleChart(String market, String unit, LocalDateTime to, int count) {
		//String response = request(HttpMethodType.GET, CANDLES_DAYS_PATH, "market=KRW-BTC&count=31&convertingPriceUnit=KRW");
		
		TimeSeries series = new BaseTimeSeries();
		DateTimeFormatter p = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		String too = "2018-08-25%2023:59:59"; //utc
		
		jsonList = new ArrayList<>();
		List<Map<String, Object>> pl = new ArrayList<>();
		String time = null;
		for (int i=0; i<10; i++) {
			String response = request(HttpMethodType.GET, CANDLES_MINUTES_PATH + "/5", "?market=KRW-BTC&count=200&to=" + too);
			
			//if (jsonList.size() > 0) {
				//jsonList.addAll(0, gson.fromJson(response, classOfJsonList));
			/*} else {
				jsonList = gson.fromJson(response, classOfJsonList);
			}*/
				
				List<Map<String, Object>> abc = gson.fromJson(response, classOfJsonList);
				pl.addAll(abc);
				time = (String)(abc.get(199).get("candle_date_time_utc"));
				too = time.replaceAll("T", "%20");
			
			
		/*	int index = jsonList.size() - 1;
			System.out.println(index);
			
			Map<String, Object> aaa = jsonList.get(index - 199);
			
			time = (String)aaa.get("candle_date_time_kst");
			
			System.out.println(time); // <== 199 번째
			
			too = time.replaceAll("T", "%20");*/
		}
		
		for (int kkk = 0; kkk< pl.size(); kkk++)
			System.out.println(kkk + ":" + pl.get(kkk).get("candle_date_time_utc"));
			
		ListIterator<Map<String, Object>> iter = pl.listIterator(pl.size());
		
		
		int i = 0;
		ZonedDateTime a = null;
		while (iter.hasPrevious()) {
			Map<String, Object> item = iter.previous();
			
			time = (String)item.get("candle_date_time_kst");
			ZoneId timeZone = ZoneId.systemDefault();
			
			if (a != null && a.compareTo(LocalDateTime.parse(time, p).atZone(timeZone)) == 0)
				continue;
			
	        a = LocalDateTime.parse(time, p).atZone(timeZone);
	         
	         
	         
			double openPrice = (double)item.get("opening_price");
			double highPrice = (double)item.get("high_price");
			double lowPrice = (double)item.get("low_price");
			double closePrice = (double)item.get("trade_price");
			double volume = (double)item.get("candle_acc_trade_volume");
			
			System.out.println(i++ + ", " + time + ", " + openPrice + ", " + volume);
			series.addBar(new BaseBar(a, openPrice, highPrice, lowPrice, closePrice, volume));
		}
				
		
		return series;
	}
	
}
