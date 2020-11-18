import React, { useState, useCallback } from "react";
import { Layout, Page } from "@shopify/polaris";

import { swalConfirm, swalSuccess, swalError, swal } from '../../src/components/common/swal';
import ActivateFeatures from '../../src/components/main/config/activate-features/activate-features.js';
import ClientForm from '../../src/components/main/config/client-form/client-form.js';

export default function ConfigComponent() {
  // CLIENT FORM
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const onChangeClientId = useCallback((value) => {
    setClientId(value);
  }, []);
  const onChangeClientSecret = useCallback((value) => {
    setClientSecret(value);
  }, []);

  // ACTIVATE FEATURES
  const [features, setFeatures] = useState([]);
  const onChangeFeatures = useCallback((value) => setFeatures(value), []);

  const onSubmitConfig = () => {
    swalConfirm({
      title: 'Apakah anda ingin menyimpan konfigurasi ini?',
      preConfirm: () => {
        // 
      },
    }).then(res => {
      if (res.isConfirmed) {
        swalError({
          title: 'Tidak Sukses menyimpan konfigurasi'
        });
      }
    });
  }

  const onSubmitFeatures = () => {
    swalConfirm({
      title: 'Apakah anda ingin menyimpan konfigurasi ini?',
      preConfirm: () => {
        // 
      },
    }).then(res => {
      if (res.isConfirmed) {
        swalSuccess({
          title: 'Sukses menyimpan konfigurasi'
        });
      }
    });
  }

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <div style={{ maxWidth: '420px', margin: 'auto' }}>
            <ClientForm
              clientId={clientId}
              clientSecret={clientSecret}
              onChangeClientId={onChangeClientId}
              onChangeClientSecret={onChangeClientSecret}
              onSubmit={() => {
                onSubmitConfig();
              }}
            />
          </div>
        </Layout.Section>
        <Layout.Section>
          <div style={{ maxWidth: '420px', margin: 'auto' }}>
            <ActivateFeatures
              features={features}
              onChangeFeatures={onChangeFeatures}
              onSubmit={() => {
                onSubmitFeatures();
              }}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
