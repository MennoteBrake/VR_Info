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
            points
          }
          trip {
            alerts {
              alertDescriptionText
            }
            route {
              type
              shortName
            }
          }
          startTime
          endTime
          from {
            name
          }
          to {
            name
          }
          mode
          duration
        }
      }
    }
  }
`;
