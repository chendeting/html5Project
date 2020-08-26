package com.cj.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * restful 接口返回信息的实体类
 * @param <T>
 */
@ApiModel(description = "服务器端返回结果")
public class DCResponse<T> {
    /**
     * 请求接口正常返回
     */
    public static final int CODE_OK = 200;

    /**
     * 参数错误
     */
    public static final String CODE_PARAM_ERROR = "E00001";

    @ApiModelProperty(value = "结果集",name = "result",example = "字符串或json数据")
    private T result;
    @ApiModelProperty(value = "代码",name = "code")
    private int code;

    @ApiModelProperty(value = "描述",name = "msg",example = "成功")
    private String msg;

    private DCResponse() {
    }

    private DCResponse(ResponseBuilder<T> builder) {
        this.result = builder.result;
        this.code = builder.code;
        this.msg = builder.msg;
    }

    public T getResult() {
        if(result == null){
            return (T) "";
        }
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    /**
     *
     * @param result
     * @param <T>
     * @return
     */
    public static <T> DCResponse<T> ok(T result){
        return new ResponseBuilder(result)
                .code(CODE_OK)
                .build();
    }

    public static DCResponse error(int code, String message) {
        return new ResponseBuilder("")
                .code(code)
                .msg(message)
                .build();
    }

    public static class ResponseBuilder<T> {
        private T result;
        private int code;

        private String msg;

        public ResponseBuilder() {
            this.result = null;
        }

        public ResponseBuilder(T result) {
            this.result = result;
        }

        public ResponseBuilder code(int code) {
            this.code = code;
            if(CODE_OK == code){
                this.msg = "操作成功";
            }else{
                this.msg = "操作失败";
            }
            return this;
        }

        public ResponseBuilder result(T result) {
            this.result = result;
            return this;
        }

        public ResponseBuilder msg(String msg) {
            this.msg = msg;
            return this;
        }

        public DCResponse<T> build() {
            return new DCResponse(this);
        }
    }
}

