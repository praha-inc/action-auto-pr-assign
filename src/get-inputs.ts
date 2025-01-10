import { getMultilineInput, getInput } from '@actions/core';

import type { Context } from '@actions/github/lib/context';

export type GetInputs = (
  context: Context
) => {
  author: string;
  exclude: string[];
  reviewers: string[];
  token: string;
};

export const getInputs: GetInputs = (context) => {
  if (context.payload.pull_request === undefined) {
    throw new Error('This action is only valid for pull_request');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const author = String(context.payload.pull_request['user']?.login ?? '');
  const exclude = getMultilineInput('exclude', { required: true });
  const reviewers = getMultilineInput('reviewers', { required: true }).filter((reviewer) => reviewer !== author);
  const token = getInput('GITHUB_TOKEN', { required: true });

  return {
    author,
    exclude,
    reviewers,
    token,
  };
};
