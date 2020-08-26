package com.cj.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.cj.model.Reference;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface ReferenceMapper extends BaseMapper<Reference> {
    Map<String,Object> selectByHm(@Param("hm") String hm);
}
