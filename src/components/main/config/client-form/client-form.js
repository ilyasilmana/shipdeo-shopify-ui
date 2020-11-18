import React from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Stack,
  TextField,
} from "@shopify/polaris";

/**
 * @param {Object} props
 * @param {string} props.clientId
 * @param {string} props.clientSecret
 * @param {Function} props.onChangeClientId
 * @param {Function} props.onChangeClientSecret
 * @param {(event: React.FormEvent<HTMLFormElement>) => void} props.onSubmit
 */
function ClientForm(props) {
  return (
    <React.Fragment>
      <Card sectioned>
        <Form onSubmit={props.onSubmit}>
          <FormLayout>
            <TextField
              value={props.clientId}
              onChange={props.onChangeClientId}
              label="Client Id*"
            />

            <TextField
              value={props.clientSecret}
              onChange={props.onChangeClientSecret}
              label="Client Secret*"
            />
            <Stack distribution="center">
              <Button primary submit>Save</Button>
            </Stack>
          </FormLayout>
        </Form>
      </Card>
    </React.Fragment>
  )
}

export default ClientForm;
