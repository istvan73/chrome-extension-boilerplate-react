import { useEffect, useState } from 'react';
import { StorageItemNamspaces } from '../../../protocol';

export const useDomainWhitelist = (currentDomain: string | undefined) => {
  const [isCurrentDomainWhitelisted, setIsCurrentDomainWhitelisted] =
    useState(false);

  useEffect(() => {
    currentDomain &&
      chrome.storage.local.get(
        [StorageItemNamspaces.ALLOWED_DOMAINS],
        (items) => {
          const allowedDomains = items[
            StorageItemNamspaces.ALLOWED_DOMAINS
          ] as {
            [domain: string]: boolean;
          };

          if (allowedDomains) {
            if (allowedDomains[currentDomain]) {
              setIsCurrentDomainWhitelisted(true);
            }
          }
        }
      );
  }, [currentDomain]);

  const updateCurrentDomainStatus = (isWhitelisted: boolean) => {
    setIsCurrentDomainWhitelisted(isWhitelisted);

    chrome.storage.local.get(
      [StorageItemNamspaces.ALLOWED_DOMAINS],
      (items) => {
        const allowedDomains = items[StorageItemNamspaces.ALLOWED_DOMAINS]
          ? (items[StorageItemNamspaces.ALLOWED_DOMAINS] as {
              [domain: string]: boolean;
            })
          : {};

        if (allowedDomains && currentDomain) {
          const updatedDomainList = {
            [StorageItemNamspaces.ALLOWED_DOMAINS]: {
              ...allowedDomains,
              [currentDomain]: isWhitelisted,
            },
          };

          chrome.storage.local.set(updatedDomainList);
        }
      }
    );
  };

  return { isCurrentDomainWhitelisted, updateCurrentDomainStatus };
};
