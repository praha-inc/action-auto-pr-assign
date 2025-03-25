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
    console.log(`This PR is created by ${author}`);
    return;
  }

  const octokit = getOctokit(token);

  const results = await Promise.allSettled([
    octokit.rest.issues.addAssignees({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      assignees: [author],
    }),
    octokit.rest.pulls.requestReviewers({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
      reviewers,
    }),
  ]);

  results.forEach((result) => {
    if (result.status === 'fulfilled') return;
    console.error(result.reason);
  });
};
