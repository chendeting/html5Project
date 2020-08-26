package com.cj.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import io.swagger.annotations.ApiModel;

import java.io.Serializable;

@ApiModel(value="开奖表",description="开奖表")
@TableName("kaijiang_bk")
public class KaijiangBk extends Model<KaijiangBk> {

    private static final long serialVersionUID = 1L;

    private String hm1;
    private String hm2;
    private String hm3;
    private String hm4;
    private String hm5;
    private String hm6;
    private String hm7;
    private String proxyUser;
    private String kjstatue;
    private String nextkjtime;
    private Integer qs;


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

    public String getProxyUser() {
        return proxyUser;
    }

    public void setProxyUser(String proxyUser) {
        this.proxyUser = proxyUser;
    }

    public String getKjstatue() {
        return kjstatue;
    }

    public void setKjstatue(String kjstatue) {
        this.kjstatue = kjstatue;
    }

    public String getNextkjtime() {
        return nextkjtime;
    }

    public void setNextkjtime(String nextkjtime) {
        this.nextkjtime = nextkjtime;
    }

    public Integer getQs() {
        return qs;
    }

    public void setQs(Integer qs) {
        this.qs = qs;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "KaijiangBk{" +
        ", hm1=" + hm1 +
        ", hm2=" + hm2 +
        ", hm3=" + hm3 +
        ", hm4=" + hm4 +
        ", hm5=" + hm5 +
        ", hm6=" + hm6 +
        ", hm7=" + hm7 +
        ", proxyUser=" + proxyUser +
        ", kjstatue=" + kjstatue +
        ", nextkjtime=" + nextkjtime +
        ", qs=" + qs +
        "}";
    }
}
