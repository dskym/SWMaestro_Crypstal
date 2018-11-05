package com.crypstal.api.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;
import org.ta4j.core.Decimal;

@MappedTypes(Decimal.class)
public class DecimalTypeHandler extends BaseTypeHandler<Decimal> {

	@Override
	public Decimal getNullableResult(ResultSet arg0, String arg1) throws SQLException {
		return null;
	}

	@Override
	public Decimal getNullableResult(ResultSet arg0, int arg1) throws SQLException {
		return null;
	}

	@Override
	public Decimal getNullableResult(CallableStatement arg0, int arg1) throws SQLException {
		return null;
	}

	@Override
	public void setNonNullParameter(PreparedStatement pstmt, int i, Decimal decimal, JdbcType arg3)
			throws SQLException {
		pstmt.setDouble(i, decimal.doubleValue());
	}

}
