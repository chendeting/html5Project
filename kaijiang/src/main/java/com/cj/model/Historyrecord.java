package com.cj.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import io.swagger.annotations.ApiModel;

import java.io.Serializable;

@ApiModel(value="开奖历史",description="开奖历史")
@TableName("historyrecord")
public class Historyrecord extends Model<Historyrecord> {

    private static final long serialVersionUID = 1L;

    private String years;
    private String qs;
    private String hm1;
    private String hm2;
    private String hm3;
    private String hm4;
    private String hm5;
    private String hm6;
    private String hm7;
    private String sx1;
    private String sx2;
    private String sx3;
    private String sx4;
    private String sx5;
    private String sx6;
    private String sx7;
    private String kjdate;


    public String getYears() {
        return years;
    }

    public void setYears(String years) {
        this.years = years;
    }

    public String getQs() {
        return qs;
    }

    public void setQs(String qs) {
        this.qs = qs;
    }

    public String getHm1() {
        return hm1;
    }

    public void setHm1(String hm1) {
        this.hm1 = hm1;
    }

    public String getHm2() {
        return hm2;
    }

    public void setHm2(String hm2) {
        this.hm2 = hm2;
    }

    public String getHm3() {
        return hm3;
    }

    public void setHm3(String hm3) {
        this.hm3 = hm3;
    }

    public String getHm4() {
        return hm4;
    }

    public void setHm4(String hm4) {
        this.hm4 = hm4;
    }

    public String getHm5() {
        return hm5;
    }

    public void setHm5(String hm5) {
        this.hm5 = hm5;
    }

    public String getHm6() {
        return hm6;
    }

    public void setHm6(String hm6) {
        this.hm6 = hm6;
    }

    public String getHm7() {
        return hm7;
    }

    public void setHm7(String hm7) {
        this.hm7 = hm7;
    }

    public String getSx1() {
        return sx1;
    }

    public void setSx1(String sx1) {
        this.sx1 = sx1;
    }

    public String getSx2() {
        return sx2;
    }

    public void setSx2(String sx2) {
        this.sx2 = sx2;
    }

    public String getSx3() {
        return sx3;
    }

    public void setSx3(String sx3) {
        this.sx3 = sx3;
    }

    public String getSx4() {
        return sx4;
    }

    public void setSx4(String sx4) {
        this.sx4 = sx4;
    }

    public String getSx5() {
        return sx5;
    }

    public void setSx5(String sx5) {
        this.sx5 = sx5;
    }

    public String getSx6() {
        return sx6;
    }

    public void setSx6(String sx6) {
        this.sx6 = sx6;
    }

    public String getSx7() {
        return sx7;
    }

    public void setSx7(String sx7) {
        this.sx7 = sx7;
    }

    public String getKjdate() {
        return kjdate;
    }

    public void setKjdate(String kjdate) {
        this.kjdate = kjdate;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "Historyrecord{" +
        ", years=" + years +
        ", qs=" + qs +
        ", hm1=" + hm1 +
        ", hm2=" + hm2 +
        ", hm3=" + hm3 +
        ", hm4=" + hm4 +
        ", hm5=" + hm5 +
        ", hm6=" + hm6 +
        ", hm7=" + hm7 +
        ", sx1=" + sx1 +
        ", sx2=" + sx2 +
        ", sx3=" + sx3 +
        ", sx4=" + sx4 +
        ", sx5=" + sx5 +
        ", sx6=" + sx6 +
        ", sx7=" + sx7 +
        ", kjdate=" + kjdate +
        "}";
    }
}
