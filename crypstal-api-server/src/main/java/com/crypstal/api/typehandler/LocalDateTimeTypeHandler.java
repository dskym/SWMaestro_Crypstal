package com.crypstal.api.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

@MappedTypes(LocalDateTime.class)
public class LocalDateTimeTypeHandler extends BaseTypeHandler<LocalDateTime> {
	
	private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	@Override
	public LocalDateTime getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return LocalDateTime.parse(rs.getString(columnName).toString().replaceAll("\\.\\d+", ""), dateTimeFormatter);
	}

	@Override
	public LocalDateTime getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return LocalDateTime.parse(rs.getString(columnIndex).toString().replaceAll("\\.\\d+", ""), dateTimeFormatter);
	}

	@Override
	public LocalDateTime getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return LocalDateTime.parse(cs.getString(columnIndex).toString().replaceAll("\\.\\d+", ""), dateTimeFormatter);
	}

	@Override
	public void setNonNullParameter(PreparedStatement pstmt, int i, LocalDateTime parameter, JdbcType arg3)
			throws SQLException {
		pstmt.setString(i, parameter.format(dateTimeFormatter).toString());
	}


}
