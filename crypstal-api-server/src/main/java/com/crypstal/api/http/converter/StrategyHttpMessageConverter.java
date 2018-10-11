package com.crypstal.api.http.converter;

import java.io.IOException;

import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;

import com.crypstal.api.strategy.Strategy;

@Deprecated
public class StrategyHttpMessageConverter extends AbstractHttpMessageConverter<Strategy> {

	@Override
	protected Strategy readInternal(Class<? extends Strategy> clazz, HttpInputMessage inputMessage)
			throws IOException, HttpMessageNotReadableException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected boolean supports(Class<?> clazz) {
		return Strategy.class == clazz;
	}

	@Override
	protected void writeInternal(Strategy arg0, HttpOutputMessage arg1)
			throws IOException, HttpMessageNotWritableException {
		// TODO Auto-generated method stub
		
	}

}
