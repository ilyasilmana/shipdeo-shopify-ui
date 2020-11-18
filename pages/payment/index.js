import React, { useState, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';
import {
  Card,
  Checkbox,
  Button,
  Form,
  FormLayout,
  Heading,
  Layout,
  Page,
  TextField,
  Tooltip,
} from "@shopify/polaris";

import conclass from "../../src/utils/conclass";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Preparing the Editor...</p> });

export default function PaymentComponent() {
  let editor = null;

  const [activated, setActivated] = useState(false);
  const [detailInformation, setDetailInformation] = useState(false);
  const onChangeActivated = useCallback((checked) => { setActivated(checked) }, []);

  const handleFieldChange = useCallback((value, id) => {
    switch (id) {
      case "detail-information":
        setDetailInformation(value);
        break;
    }
  }, []);

  const [editorValue, setEditorValue] = useState("");

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Transfer" sectioned>
            <Tooltip light content="Turn The switch to activate Transfer Payment." preferredPosition="above">
              <Checkbox
                label={(<Heading>Activated</Heading>)}
                checked={activated}
                onChange={onChangeActivated}
              />
            </Tooltip>
            <Form onSubmit={() => { }}>
              <FormLayout>
                <React.Fragment>
                  <label className="form-label">Detail Information</label>
                  <TextField
                    id="detail-information"
                    value={detailInformation}
                    onChange={handleFieldChange}
                    multiline={true}
                    disabled={!activated}
                  />
                </React.Fragment>
                <React.Fragment>
                  <label className="form-label">Instuksi Permbayaran</label>
                  <div className={activated ? '' : 'pm-editor-disabled'}>
                    <ReactQuill
                      theme="snow"
                      value={editorValue}
                      onChange={value => {
                        if (activated) {
                          setEditorValue(value);
                        }
                        else {
                          setEditorValue(editorValue);
                        }
                      }}
                    />
                  </div>
                </React.Fragment>
              </FormLayout>
              <br />
              <FormLayout>
                <div className={conclass('use-button btn-wrapper', activated ? '' : 'disable-save')}>
                  <Button primary submit disabled={!activated}> Save </Button>
                </div>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
