import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql',
  cache: new InMemoryCache()
});

export const JOURNEY_ITINERARY_QUERY = gql`
  query Routes($latFrom: Float!, $lonFrom: Float!, $latTo: Float!, $lonTo: Float!, $date: String!, $time: String!) {
    plan(
      from: {lat: $latFrom, lon: $lonFrom},
      to: {lat: $latTo, lon: $lonTo},
      numItineraries: 5,
      date: $date,
      time: $time,
      transportModes: [{mode: WALK}, {mode: RAIL}]) {
      itineraries {
        duration
        startTime
        endTime
        legs {
          legGeometry {
            length
            points
          }
          startTime
          endTime
          from {
            name
          }
          to {
            name
          }
          intermediateStops {
            name
          }
          mode
          duration
          distance
          agency {
            name
          }
        }
        fares {
          type
          cents
          currency
        }
      }
    }
  }
`;
