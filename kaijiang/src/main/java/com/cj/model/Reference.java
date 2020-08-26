package com.cj.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import io.swagger.annotations.ApiModel;

import java.io.Serializable;

@ApiModel(value="对照表",description="对照表")
@TableName("reference")
public class Reference extends Model<Reference> {
    private static final long serialVersionUID = 1L;
    private String year;
    private String hm;
    private String sx;
    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSx() {
        return sx;
    }

    public void setSx(String sx) {
        this.sx = sx;
    }

    public String getYear() {

        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getHm() {
        return hm;
    }

    public void setHm(String hm) {
        this.hm = hm;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }
}
