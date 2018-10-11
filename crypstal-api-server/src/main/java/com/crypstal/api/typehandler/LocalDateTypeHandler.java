package com.crypstal.api.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

@MappedTypes(LocalDate.class)
public class LocalDateTypeHandler extends BaseTypeHandler<LocalDate> {

	@Override
	public LocalDate getNullableResult(ResultSet arg0, String arg1) throws SQLException {
		return null;
	}

	@Override
	public LocalDate getNullableResult(ResultSet arg0, int arg1) throws SQLException {
		return null;
	}

	@Override
	public LocalDate getNullableResult(CallableStatement arg0, int arg1) throws SQLException {
		return null;
	}

	@Override
	public void setNonNullParameter(PreparedStatement arg0, int arg1, LocalDate arg2, JdbcType arg3)
			throws SQLException {
		
	}

}
