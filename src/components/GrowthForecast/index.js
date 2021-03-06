// Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Redux
import { connect } from 'react-redux';
import { setHealthUnit } from '../../redux/actions';
// UI Components
import BeatLoader from 'react-spinners/BeatLoader';
import { Box, Flex, Text, Heading, Button } from 'rebass/styled-components';
import ChartCard from '../ChartCard';
import Modal from '../UI/Modal';
import { Pgh } from '../UI/textComponents';
import Select from '../UI/Select';
import theme from '../../theme';
// Utils
import { calcMedian } from '../../utils';

const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;

  th,
  td {
    border: 0.05rem solid ${({ theme }) => theme.colors.text};
    padding: 0.5rem;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  max-width: 32rem;
  height: 18rem;
  margin: 0 auto 2rem;
  display: block;
`;

const convertOptions = options => {
  return options.map(option => ({
    value: option,
    label: option === 'All' ? 'Ontario' : option,
  }));
};

export const GrowthForecast = ({
  cases,
  healthUnit,
  healthUnits,
  setHealthUnit,
}) => {
  const filteredCases = cases.filter(c => c.growthFactor !== undefined); // ignores empty values
  const recentCases = filteredCases.slice(filteredCases.length - 14); // last 14 reported days

  const medianGrowthFactor = calcMedian('growthFactor', recentCases);

  let healthCheck;
  let healthColor;
  if (medianGrowthFactor >= 1.15) {
    healthCheck = 'Not flattening';
    healthColor = 'red';
  } else if (medianGrowthFactor > 1) {
    healthCheck = 'Not flattening but growing more slowly';
    healthColor = 'orange';
  } else if (medianGrowthFactor > 0.85) {
    healthCheck = 'Flattening slowly';
    healthColor = 'darkgreen';
  } else if (medianGrowthFactor > 0) {
    healthCheck = 'Flattening quickly';
    healthColor = 'green';
  } else {
    healthCheck = 'Flattened';
    healthColor = 'limegreen';
  }

  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = selected => setHealthUnit(selected.value);
  const huOptions = convertOptions(healthUnits);

  return (
    <React.Fragment>
      <Box
        as='section'
        data-test='growthForecast'
        sx={{
          textAlign: 'center',
          p: 4,
          bg: 'primaryFaded',
          color: 'primary',
          borderRadius: 'small',
          boxShadow: 'small',
        }}
      >
        {recentCases.length ? (
          <>
            <Heading
              as='h2'
              sx={{
                fontSize: 4,
                my: 0,
                mb: 2,
              }}
            >
              Has the curve flattened for{' '}
              <Text as='span' display='block'>
                <Select
                  name='health units'
                  options={huOptions}
                  defaultValue={huOptions[0]}
                  onChange={handleSelect}
                  styles={{
                    container: styles => ({
                      ...styles,
                      display: 'inline-block',
                      width: '30rem',
                      maxWidth: '90%',
                    }),
                  }}
                />
                <Text as='span' ml={2}>
                  ?
                </Text>
              </Text>
            </Heading>

            <Pgh
              variant='variants.badge'
              sx={{
                fontSize: [4, 4, 5],
                color: healthColor,
                my: [4, 4, 5],
                mx: 'auto',
                p: [3, 3, 4],
                fontWeight: 'heading',
                borderRadius: ['small', 'large'],
                width: '20rem',
                maxWidth: '100%',
              }}
            >
              {healthCheck}
            </Pgh>

            <Button
              variant='secondary'
              sx={{
                color: 'primary',
                cursor: 'pointer',
              }}
              onClick={() => setModalOpen(true)}
            >
              See details on how this is calculated
            </Button>
          </>
        ) : (
          <Flex justifyContent='center' alignItems='center' height='100%'>
            <BeatLoader
              data-test='loader'
              color={theme.colors.primary}
              loading={true}
              size={20}
            />
          </Flex>
        )}
      </Box>

      <Modal active={modalOpen} close={() => setModalOpen(false)}>
        <Heading as='h2' fontSize={5} mt={5} mb={4}>
          In the last {recentCases.length} reported days in{' '}
          <span style={{ color: theme.colors.primary }}>
            {healthUnit === 'All' ? 'Ontario' : healthUnit}
          </span>
          , median growth factor has been{' '}
          <span style={{ color: healthColor }}>{medianGrowthFactor}</span>
        </Heading>

        <Pgh color='unfocusedText' textAlign='center' mb={2}>
          <span style={{ fontWeight: 700 }}>Rule of thumb: </span>
          We know the curve is flattening when the growth factor is less than or
          equal to 1
        </Pgh>

        <ChartCard
          data-test='growthChart'
          data={recentCases}
          title={`Median Growth factor (last ${recentCases.length} reported days)`}
          dataKey='growthFactor'
          displayType='median'
          height='15rem'
          icon='chart-line'
          color={theme.colors.tertiary}
        />

        <Heading as='h3' mt={5} mb={2}>
          Legend
        </Heading>
        <Table>
          <thead>
            <tr>
              <th>Growth Factor</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.15 and up</td>
              <td style={{ color: 'red' }}>Not flattening</td>
            </tr>
            <tr>
              <td>1.1 - 1.14</td>
              <td style={{ color: 'orange' }}>
                Not flattening but growing slowly
              </td>
            </tr>
            <tr>
              <td>0.86 - 1</td>
              <td style={{ color: 'darkgreen' }}>Starting to flatten</td>
            </tr>
            <tr>
              <td>0.01 - 0.85</td>
              <td style={{ color: 'green' }}>Flattening quickly</td>
            </tr>
            <tr>
              <td>0</td>
              <td style={{ color: 'limegreen' }}>Flattened</td>
            </tr>
          </tbody>
        </Table>

        <Heading as='h3' mt={5} mb={2}>
          What is a growth factor? How are these calculations made?
        </Heading>
        <Iframe
          src='https://www.youtube.com/embed/Kas0tIxDvrg'
          frameborder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></Iframe>
      </Modal>
    </React.Fragment>
  );
};

GrowthForecast.propTypes = {
  setHealthUnit: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      positive: PropTypes.number,
      resolved: PropTypes.number,
      deceased: PropTypes.number,
    })
  ).isRequired,
  healthUnit: PropTypes.string.isRequired,
  healthUnits: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setHealthUnit,
};

const ConnectedGrowthForecast = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrowthForecast);

export default ConnectedGrowthForecast;
