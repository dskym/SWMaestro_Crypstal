package com.crypstal.api.dao;

import java.util.List;
import java.util.Map;

import org.apache.commons.text.WordUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import org.ta4j.core.Bar;

import com.crypstal.ta4j.MutableBaseBar;

@Repository
public class CandleDao extends AbstractDao<Bar> {
	
	//public static Logger logger = Logger.getLogger(CandleDao.class);
	
	public List<Bar> selectList(Map<String, Object> params) {
		int unit = (int)params.get("unit");

		return getSqlSession().selectList(getMappedStatement("selectListBithumbBTC10SEC"), params);
	}
	
	public List<Bar> selectLatestBithumbBTC10SEC(int count) {
		System.out.println("count: " + count);
		return getSqlSession().selectList(getMappedStatement("selectLatestBithumbBTC10SEC"), count);
	}
	
	public void insertOrUpdateBithumbBTC10SEC(MutableBaseBar bar) {
		getSqlSession().insert(getMappedStatement("insertOrUpdateBithumbBTC10SEC"), bar);
	}
	
	public void insertOrUpdateBithumbBTC30SEC(MutableBaseBar bar) {
		getSqlSession().insert(getMappedStatement("insertOrUpdateBithumbBTC30SEC"), bar);
	}
	
	public void insertOrUpdateBithumbBTC1MIN(MutableBaseBar bar) {
		getSqlSession().insert(getMappedStatement("insertOrUpdateBithumbBTC1MIN"), bar);
	}
	
	public void insertOrUpdateBithumbBTC3MIN(MutableBaseBar bar) {
		getSqlSession().insert(getMappedStatement("insertOrUpdateBithumbBTC3MIN"), bar);
	}
}
