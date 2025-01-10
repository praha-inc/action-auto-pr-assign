import { context, getOctokit } from '@actions/github';

export type Main = (props: {
  author: string;
  exclude: string[];
  reviewers: string[];
  token: string;
}) => Promise<void>;

export const main: Main = async ({
  author,
  exclude,
  reviewers,
  token,
}) => {
  if (author === '') {
    throw new Error('Author is empty');
  }

  if (exclude.includes(author)) {
    throw new Error(`This PR is created by ${author}`);
  }

  await getOctokit(token).rest.pulls.requestReviewers({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    reviewers,
  });
};
