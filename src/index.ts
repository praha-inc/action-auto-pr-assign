import { setFailed } from '@actions/core';
import { context } from '@actions/github';

import { getInputs } from './get-inputs';
import { main } from './main';

try {
  await main(getInputs(context));
} catch (error) {
  if (error instanceof Error) setFailed(error.message);
  else setFailed('An error occurred: ' + JSON.stringify(error));
}
