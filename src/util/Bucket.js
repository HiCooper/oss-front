const BucketInfoKey = 'BucketInfoKey';

export function getCurrentBucket() {
  const bucket = localStorage.getItem(BucketInfoKey);
  if (bucket) {
    return JSON.parse(bucket);
  }
  return null;
}

export function setCurrentBucketInfo(bucketInfo) {
  localStorage.setItem(BucketInfoKey, bucketInfo);
}
