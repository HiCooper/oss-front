const BucketInfoKey = 'BucketInfoKey';

export function getCurrentBucket() {
  const bucket = localStorage.getItem(BucketInfoKey);
  if (bucket) {
    return JSON.parse(bucket);
  }
  window.location.replace(`${window.location.protocol}//${window.location.host}/#/`);
  return null;
}

export function setCurrentBucketInfo(bucketInfo) {
  localStorage.setItem(BucketInfoKey, bucketInfo);
}
