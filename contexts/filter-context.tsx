import { createContext, useContext, useMemo } from 'react';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { QuestionTagKey } from '@/shapes';

type FilterContextType = {
  tags: QuestionTagKey[];
  addTag: (tag: QuestionTagKey) => void;
  removeTag: (tag: QuestionTagKey) => void;
  clearTags: () => void;
  setTags: (tags: QuestionTagKey[]) => void;
};

const defaultFilterContextValue: FilterContextType = {
  tags: [],
  addTag: () => {},
  removeTag: () => {},
  clearTags: () => {},
  setTags: () => {},
};

const FilterContext = createContext<FilterContextType>(defaultFilterContextValue);

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [tags, setTags] = useState<QuestionTagKey[]>([]);
  const clearTags = () => setTags([]);
  const addTag = useCallback(
    (tag: QuestionTagKey) => !tags.includes(tag) && setTags([...tags, tag]),
    [tags],
  );
  const removeTag = useCallback(
    (tag: QuestionTagKey) => setTags(tags.filter((t) => t !== tag)),
    [tags],
  );
  const context = useMemo(() => {
    return {
      tags,
      setTags,
      clearTags,
      addTag,
      removeTag,
    };
  }, [tags, setTags, addTag, removeTag]);
  return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>;
};

export function useFilterContext() {
  return useContext(FilterContext);
}
