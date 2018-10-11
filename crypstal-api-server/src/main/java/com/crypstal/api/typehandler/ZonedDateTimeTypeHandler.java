package com.crypstal.api.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

@MappedTypes(ZonedDateTime.class)
public class ZonedDateTimeTypeHandler extends BaseTypeHandler<ZonedDateTime> {
	
	private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	@Override
	public ZonedDateTime getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return LocalDateTime.parse(rs.getString(columnName).toString().replaceAll("\\.\\d+", ""), dateTimeFormatter).atZone(ZoneId.systemDefault());
	}

	@Override
	public ZonedDateTime getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return LocalDateTime.parse(rs.getString(columnIndex).toString().replaceAll("\\.\\d+", ""), dateTimeFormatter).atZone(ZoneId.systemDefault());
	}

	@Override
	public ZonedDateTime getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return LocalDateTime.parse(cs.getString(columnIndex).toString().replaceAll("\\.\\d+", ""), dateTimeFormatter).atZone(ZoneId.systemDefault());
	}

	@Override
	public void setNonNullParameter(PreparedStatement pstmt, int i, ZonedDateTime parameter, JdbcType arg3)
			throws SQLException {
		pstmt.setString(i, parameter.format(dateTimeFormatter).toString());
	}


}
