import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

const useInvalidator = () => {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  return useMemo(() => {
    const invalidate = async (key, queriesFilter) => {
      queryClient.invalidateQueries(key, createPredicateFilter(queriesFilter));
    };

    const reset = async (key, queriesFilter, resetActive = true) => {
      const queries = queryCache.findAll(
        key,
        createPredicateFilter(queriesFilter),
      );
      queries.forEach((q) => {
        if (resetActive || !q.isActive()) {
          queryClient.resetQueries(q.queryKey);
        } else {
          const unsubscribe = queryCache.subscribe(() => {
            if (!q.isActive()) {
              unsubscribe();
              queryClient.resetQueries(q.queryKey);
            }
          });
        }
      });
    };

    const mutate = (key, queriesFilter, mutator) => {
      const updates = findMutations(queryClient, key, queriesFilter, mutator);
      return {
        commit: () => {
          updates.forEach((u) => {
            queryClient.setQueryData(u.key, u.newData);
          });
        },
        rollback: () => {
          updates.forEach((u) => queryClient.setQueryData(u.key, u.oldData));
        },
      };
    };

    return {
      mutate,
      invalidate,
      reset,
    };
  }, [queryClient, queryCache]);
};

const createPredicateFilter = (queriesFilter) => {
  if (!queriesFilter) {
    return {};
  }
  return {
    predicate: ({ queryKey }) => {
      return queryKey[1] && queriesFilter(queryKey[1]);
    },
  };
};

const findMutations = (queryClient, key, queriesFilter, mutator) => {
  const updates = [];
  const queryCache = queryClient.getQueryCache();
  const queries = queryCache.findAll(key, createPredicateFilter(queriesFilter));

  queries.forEach((key) => {
    const oldData = queryClient.getQueryData(key);
    if (oldData && oldData.pages) {
      const oldPages = (oldData && oldData.pages) || [];
      let newPages;
      oldPages.forEach((oldPageData, index) => {
        const newPageData = mutator(oldPageData);
        if (newPageData && newPageData !== oldPageData) {
          newPages = newPages || [...oldPages];
          newPages[index] = newPageData;
        }
      });
      if (newPages) {
        updates.push({
          key,
          oldData,
          newData: { ...oldData, pages: newPages },
        });
      }
    } else {
      const newData = oldData ? mutator(oldData) : null;
      if (newData && newData !== oldData) {
        updates.push({ key, newData, oldData });
      }
    }
  });
  return updates;
};

export default useInvalidator;
