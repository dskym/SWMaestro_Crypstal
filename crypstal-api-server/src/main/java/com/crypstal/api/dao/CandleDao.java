package com.crypstal.api.dao;

import java.util.List;
import java.util.Map;

import org.apache.commons.text.WordUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import org.ta4j.core.Bar;

@Repository
public class CandleDao extends AbstractDao<Bar> {
	
	public static Logger logger = Logger.getLogger(CandleDao.class);
	
	public List<Bar> selectList(Map<String, Object> params) {
		int unit = (int)params.get("unit");
		String exchange = (String)params.get("exchange");
		String crypto = ((String)params.get("market")).split("-")[1];

		String stmtId = new StringBuilder("selectListFrom")
				.append(WordUtils.capitalize(exchange))
				.append(WordUtils.capitalize(crypto))
				.append(unit)
				.append("minCandle")
				.toString();
		
		return getSqlSession().selectList(getMappedStatement(stmtId), params);
	}
}
