import React, { useEffect, useState } from 'react';
import { StorageItemNamspaces } from '../protocol';
import { extractRootDomain } from '../Shared/helpers';
import ContentComponent from './Content.component';

const ContentContainer = () => {
  const [isContentScriptAllowed, setIsContentScriptAllowed] = useState(false);

  useEffect(() => {
    const currentDomain = extractRootDomain(window.location.href);

    chrome.storage.local.get(
      [StorageItemNamspaces.ALLOWED_DOMAINS],
      (items) => {
        const allowedDomains = items[StorageItemNamspaces.ALLOWED_DOMAINS];

        if (allowedDomains && currentDomain) {
          setIsContentScriptAllowed(allowedDomains[currentDomain]);
        }
      }
    );

    chrome.storage.onChanged.addListener((changes) => {
      const nextAllowedDomains = changes[StorageItemNamspaces.ALLOWED_DOMAINS]
        .newValue as { [domain: string]: boolean };

      if (nextAllowedDomains && currentDomain) {
        setIsContentScriptAllowed(nextAllowedDomains[currentDomain]);
      }
    });
  }, []);

  return <div>{isContentScriptAllowed && <ContentComponent />}</div>;
};

export default ContentContainer;
