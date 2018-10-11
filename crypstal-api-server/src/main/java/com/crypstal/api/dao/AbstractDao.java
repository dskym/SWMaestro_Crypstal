package com.crypstal.api.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.Data;

@Data
public abstract class AbstractDao<T> {
	
	@Autowired
	protected SqlSession sqlSession;
	
	private String mapperPrefix = "com.crypstal.api.";
	
	protected String mapperName;
	
	public AbstractDao() {
		String className = this.getClass().getSimpleName();
		String modelName = className.substring(0, className.length() - new String("Dao").length());
		StringBuilder builder = new StringBuilder(mapperPrefix).append(modelName).append("Mapper");
		this.mapperName = builder.toString();
	}
	
	public String getMappedStatement(String id) {
		return new StringBuilder(this.mapperName).append(".").append(id).toString();
	}
	
	public abstract List<T> selectList(Map<String, Object> params);

}
