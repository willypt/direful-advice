import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Modal, CardBody, HeadingText, PieChart} from 'nr1';

export default class CloisteredMeetingVisualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        }
    }
    static propTypes = {
        /**
         * A fill color to override the default fill color. This is an example of
         * a custom chart configuration.
         */
        fill: PropTypes.string,

        /**
         * A stroke color to override the default stroke color. This is an example of
         * a custom chart configuration.
         */
        stroke: PropTypes.string,
        /**
         * An array of objects consisting of a nrql `query` and `accountId`.
         * This should be a standard prop for any NRQL based visualizations.
         */
        nrqlQueries: PropTypes.arrayOf(
            PropTypes.shape({
                accountId: PropTypes.number,
                query: PropTypes.string,
            })
        ),
    };

    render() {
        const {nrqlQueries, stroke, fill} = this.props;

        const nrqlQueryPropsAvailable =
            nrqlQueries &&
            nrqlQueries[0] &&
            nrqlQueries[0].accountId &&
            nrqlQueries[0].query;

        if (!nrqlQueryPropsAvailable) {
            return <EmptyState />;
        }

        return (
          <>
              <Button onClick={() => this.setState({hidden: false})}>Open Modal</Button>
              <Modal hidden={this.state.hidden} onClose={() => this.setState({hidden: true})}>
                  <PieChart accountIds={[parseInt(nrqlQueries[0].accountId)]} query={nrqlQueries[0].query} fullWidth />
              </Modal>
              <PieChart accountIds={[parseInt(nrqlQueries[0].accountId)]} query={nrqlQueries[0].query} fullWidth />
          </>
          );
    }
}

const EmptyState = () => (
    <Card className="EmptyState">
        <CardBody className="EmptyState-cardBody">
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                Please provide at least one NRQL query & account ID pair
            </HeadingText>
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                type={HeadingText.TYPE.HEADING_4}
            >
                An example NRQL query you can try is:
            </HeadingText>
            <code>
                FROM NrUsage SELECT sum(usage) FACET metric SINCE 1 week ago
            </code>
        </CardBody>
    </Card>
);