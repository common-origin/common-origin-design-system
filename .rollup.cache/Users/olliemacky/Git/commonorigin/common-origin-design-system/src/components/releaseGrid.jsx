import React, { useState } from 'react';
import { Box, Button, ResponsiveGrid, Stack } from './';
import { ReleaseCard } from './molecules/ReleaseCard';
export var ReleaseGrid = function (_a) {
    var releases = _a.releases;
    var _b = useState('All'), filter = _b[0], setFilter = _b[1];
    var filteredReleases = filter === 'All' ? releases : releases.filter(function (release) { return release.label && release.label.includes(filter); });
    return (<Box mb="8xl">
      <Stack direction='column' gap="lg">
        <Stack direction='row' gap="sm">
          <Button onClick={function () { return setFilter('All'); }} variant={filter === 'All' ? 'secondary' : 'primary'} size='small' purpose='button'>
            All
          </Button>
          <Button onClick={function () { return setFilter('Cern'); }} variant={filter === 'Cern' ? 'secondary' : 'primary'} size='small' purpose='button'>
            Cern
          </Button>
          <Button onClick={function () { return setFilter('Disappear Here'); }} variant={filter === 'Disappear Here' ? 'secondary' : 'primary'} size='small' purpose='button'>
            Disappear Here
          </Button>
        </Stack>
        <ResponsiveGrid cols={2} colsMd={3} colsLg={4} colsXl={6} gapX="8" gapY="12">
          {filteredReleases.map(function (release) { return (<ReleaseCard key={release.slug} title={release.title} date={release.date} coverImage={release.coverImage} artist={release.artist} slug={release.slug}/>); })}
        </ResponsiveGrid>
      </Stack>
    </Box>);
};
//# sourceMappingURL=releaseGrid.jsx.map