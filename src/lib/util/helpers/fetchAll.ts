export async function fetchAll(uriList: string[], fetch: Fetch): Promise<any> {
  async function getData(uri: string) {
    const response = await fetch(uri);
    return await response.json();
  }
  
  const responses = await Promise.allSettled(
    uriList.map(uri => getData(uri))
  );
  
  return responses.map(response => {
    return (response.status === "fulfilled")
      ? response.value
      : [];
  });
}
/* 
export async function promisesSettled<T>(promises: Promise<T>[]): Promise<any> {
  
  const responses = await Promise.allSettled(promises.map(response => response.json()));
  
  async function getData(uri: string) {
    const response = await fetch(uri);
    return await response.json();
  }
  
  const responses = await Promise.allSettled(
    uriList.map(uri => getData(uri))
  );
  
  return responses.map(response => {
    return (response.status === "fulfilled")
      ? response.value
      : [];
  });
}  */