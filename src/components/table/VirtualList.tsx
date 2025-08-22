import React, { useState, useEffect, useCallback, useRef } from 'react';
import {VirtualListProps, ZTableColumn} from "./types"

export const VirtualList: React.FC<VirtualListProps> = ({items = [], itemHeight, windowHeight,columns}) => {
  const [visibleItems, setVisibleItems] = useState<{index: number; item: any}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemsRef = useRef(items);
  const itemHeightRef = useRef(itemHeight);
  const windowHeightRef = useRef(windowHeight);
  const anchorElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  itemsRef.current = items;
  itemHeightRef.current = itemHeight;
  windowHeightRef.current = windowHeight;

  // 计算可见项目
  const calculateVisibleItems = useCallback((scrollTop: number) => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeightRef.current));
    const visibleCount = Math.ceil(windowHeightRef.current / itemHeightRef.current) + 10; // 添加缓冲
    const endIndex = Math.min(startIndex + visibleCount, itemsRef.current.length);

    const newVisibleItems = [];
    for (let i = startIndex; i < endIndex; i++) {
      console.log("visibleItems",i)
      if (itemsRef.current[i] !== undefined) {
        newVisibleItems.push({ index: i, item: itemsRef.current[i] });
      }
    }
    setVisibleItems(newVisibleItems);
  }, []);

  // 创建或获取锚点元素
  const getOrCreateAnchor = useCallback((index: number): HTMLElement => {
    const key = `anchor-${index}`;
    if (anchorElementsRef.current.has(key)) {
      return anchorElementsRef.current.get(key)!;
    }

    const anchor = document.createElement('div');
    anchor.style.position = 'absolute';
    // anchor.style.top = `${index * itemHeightRef.current}px`;
    anchor.style.height = '1px';
    anchor.style.width = '100%';
    anchor.style.pointerEvents = 'none';
    anchor.dataset.index = index.toString();

    if (containerRef.current) {
      containerRef.current.appendChild(anchor);
    }

    anchorElementsRef.current.set(key, anchor);
    return anchor;
  }, []);

  // 初始化可见项目
  useEffect(() => {
    if (items.length > 0) {
      calculateVisibleItems(0);
    }
  }, [calculateVisibleItems, items.length]);

  // 设置 Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    // 如果已经存在观察器，先断开连接
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 创建 Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("交叉")
            console.log(anchorElementsRef.current)
            const scrollTop = containerRef.current?.scrollTop || 0;
            calculateVisibleItems(scrollTop);
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: `${itemHeight}px 0px ${itemHeight * 2}px 0px`, // 扩大观察区域
        threshold: 0
      }
    );

    // 根据 items 数量动态计算锚点数量
    const anchorCount = Math.max(2, Math.min(999, Math.ceil(items.length / 3)));

    // 创建中间的锚点元素
    for (let i = 0; i < anchorCount; i++) {
      const positionRatio = i / Math.max(1, anchorCount - 1);
      const anchorIndex = Math.floor(positionRatio * (items.length - 1));

      // 获取或创建锚点
      const anchor = getOrCreateAnchor(anchorIndex);
      observerRef.current.observe(anchor);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items.length, itemHeight, calculateVisibleItems, getOrCreateAnchor]);

  // 计算容器总高度
  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      className="table-body"
      // 滚动容器高度，保证滚动条正常显示
      style={{ height: windowHeight, overflow: 'auto', position: 'relative' }}
    >
      <div style={{ height: "auto", position: 'relative' }}>
        {visibleItems.map(({ index, item }) => (
            <div
                key={index}
                style={{
                  height: itemHeight,
                  position: 'absolute',  // 使用绝对定位
                  top: `${index * itemHeight}px`,  // 正确设置位置
                  width: '100%'
                }}
            >
              <div className="table-row">
                {
                  columns.map((column: ZTableColumn) => (
                      <div
                          key={column.dataIndex}
                          className="table-cell"
                      >
                        {item[column.dataIndex]}
                      </div>
                  ))
                }
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};
