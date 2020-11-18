import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import {
  Button,
  Card,
  Layout,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Stack,
} from '@shopify/polaris';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skeleton: true,
    }
  }

  renderPageSkeleton() {
    return (
      <SkeletonPage primaryAction secondaryActions={5} breadcrumbs>
        <Layout>
          <Layout.Section>
            <Card sectioned title={<SkeletonDisplayText size="small" />}>
              <SkeletonBodyText lines={4} />
              <br/>
              <Stack>
                <Stack.Item fill></Stack.Item>
                <Stack.Item>
                  <div style={{ width: '200px' }}>
                    <SkeletonDisplayText size="small" />
                  </div>
                </Stack.Item>
              </Stack>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title={<SkeletonDisplayText size="small" />}>
              <Card.Section title={<SkeletonDisplayText size="small" />}>
                <SkeletonBodyText lines={4} />
              </Card.Section>
              <Card.Section title={<SkeletonDisplayText size="small" />}>
                <SkeletonBodyText lines={4} />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    )
  }

  renderPage() {

  }

  render() {
    return (
      <React.Fragment>
        <div style={{ padding: '20px' }}>
          <Button onClick={() => this.setState(prev => ({ skeleton: !prev.skeleton }))}>Toggle Skeleton</Button>
        </div>
        { this.state.skeleton
          ? this.renderPageSkeleton()
          : this.renderPage()
        }
      </React.Fragment>
    );
  }
}

export default withRouter(OrderDetail);
