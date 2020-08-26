package com.cj.utils;


import com.baomidou.mybatisplus.plugins.Page;

public class PageFactory<T> {
    public Page<T> setPage(int pageSize, int offsetSize) {
        //每页多少条数据
        //每页的偏移量(本页当前有多少条,从第几条开始查询)
        return getPage(pageSize, offsetSize);
    }

    private Page<T> getPage(int limit, int offset) {
        Page<T> page = new Page<>((offset / limit + 1), limit);
        page.setOpenSort(false);
        return page;
    }
}

