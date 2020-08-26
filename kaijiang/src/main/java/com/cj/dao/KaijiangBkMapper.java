package com.cj.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.cj.model.KaijiangBk;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface KaijiangBkMapper extends BaseMapper<KaijiangBk> {

    Map<String,Object> selectdetail(@Param("kjstatue") String kjstatue);

    void updateStatue(@Param("kjstatue") String kjstatue,@Param("qs") Integer qs);
}
