/* eslint-disable no-console */
import React from 'react';
import RootAttributePanel from './rootAttributePanel';
import {addons, types} from '@storybook/addons';
import {ADDON_ID, PANEL_ID, PARAM_KEY} from './constants';

export const register = () => {
  addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
      type: types.TOOL,
      title: '',
      match: ({viewMode, storyId}) => {
        const params = api.getParameters(storyId, PARAM_KEY);
        if (params && !!params.tooltip) {
          return viewMode === 'story';
        }

        return false;
      },
      render: () => (
        <RootAttributePanel isToolbar={true} key={PANEL_ID} api={api} />
      )
    });

    addons.add(PANEL_ID, {
      type: types.PANEL,
      title: 'Root attribute',
      render: ({active}) => {
        const id = api.getCurrentStoryData()?.id;

        if (!id) return null;

        const paramsArray = api.getParameters(id, PARAM_KEY);
        return paramsArray.map((params) =>
          (<RootAttributePanel
            key={params.attribute}
            params={params}
            api={api}
            active={active}
          />));
      }
    });
  });
};
