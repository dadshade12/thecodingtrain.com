import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import ItemsPage from '../components/ItemsPage';
import ItemsPageFilters from '../components/ItemsPageFilters';
import Card from '../components/showcase/Card';
import Spacer from '../components/Spacer';

import DotCharacter from '../images/characters/ThisDot_7.mini.svg';
import DotCharacter2 from '../images/characters/ThisDot_3.mini.svg';
import RainbowCharacter from '../images/characters/Rainbow_1.mini.svg';

import * as css from './showcases.module.css';

const ShowcasePage = ({ data, pageContext, location }) => {
  const { language, topic } = pageContext;
  const pageData = data.pageData.nodes[0];
  const contributions = data.contributions;

  const contributionsPlaceholder = data.challengePlaceholderImage
    ? data.challengePlaceholderImage.childImageSharp.gatsbyImageData
    : null;

  const variant = 'purple';
  const itemsPath = 'showcase';

  return (
    <ItemsPage
      title={pageData.title}
      description={pageData.description}
      image={contributionsPlaceholder}
      itemsPath={itemsPath}
      variant={variant}
      Character={DotCharacter}
      SeparatorCharacter={DotCharacter2}
      EndPageCharacter={RainbowCharacter}
      characterOrientation="center"
      showPagination={contributions.length > 0}
      previousPagePath={pageContext.previousPagePath}
      numberOfPages={pageContext.numberOfPages}
      nextPagePath={pageContext.nextPagePath}
      humanPageNumber={pageContext.humanPageNumber}>
      <>
        <ItemsPageFilters
          filters={[
            {
              name: 'Language',
              icon: '⌥',
              jsonKey: 'languages',
              filterKey: 'lang',
              selectedOption: language
            },
            {
              name: 'Topic',
              icon: '☆',
              jsonKey: 'topics',
              filterKey: 'topic',
              selectedOption: topic
            }
          ]}
          filtersFilePath="/filters-contributions.json"
          location={location}
          itemsPath={itemsPath}
          variant={variant}
        />
        <Spacer />

        {contributions.length > 0 && (
          <div className={css.challenges}>
            {contributions.map((contribution, i) => (
              <Fragment key={i}>
                <Card
                  contribution={contribution}
                  placeholderImage={contributionsPlaceholder}
                />
                {i % 3 !== 2 && <div className={css.horizontalSpacer}></div>}
                {i % 3 === 2 && <div className={css.verticalSpacer}></div>}
              </Fragment>
            ))}
          </div>
        )}
      </>
    </ItemsPage>
  );
};

export const query = graphql`
  query ($skip: Int, $limit: Int, $topic: String!, $language: String!) {
    pageData: allShowcasePageInfo {
      nodes {
        title
        description
      }
    }
    contributions: contributionsPaginatedFilteredByTags(
      language: $language
      topic: $topic
      skip: $skip
      limit: $limit
    ) {
      title
      url
      submittedOn
      author {
        name
        url
      }
      video {
        title
        date
        slug
        canonicalTrack {
          slug
        }
      }
      cover {
        file {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    challengePlaceholderImage: file(
      sourceInstanceName: { eq: "challenges" }
      extension: { in: ["jpg", "png"] }
      relativeDirectory: { eq: "" }
      name: { eq: "placeholder" }
    ) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;

export default ShowcasePage;
