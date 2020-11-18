import React from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Stack,
  OptionList
} from "@shopify/polaris";

/**
 * @param {Object} props
 * @param {any[]} props.selected
 * @param {(value: string[]) => void} props.onChangeFeatures
 * @param {() => void} props.onSubmit
 */
function ActivateFeatures(props) {
  return (
    <Card title="Activate Features" sectioned>
      <Form onSubmit={props.onSubmit}>
        <FormLayout>
          <OptionList
            allowMultiple
            options={[
              { label: 'Pricing', value: 'pricing' },
              { label: 'Waybill', value: 'waybill' },
              { label: 'Create Order', value: 'order_create' },
            ]}
            selected={props.features}
            onChange={props.onChangeFeatures}
          />
          <Stack distribution="center">
            <Button primary submit>Save</Button>
          </Stack>
        </FormLayout>
      </Form>
    </Card>
  )
}

export default ActivateFeatures;
