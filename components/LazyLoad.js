import Blazy from 'blazy';

const LazyLoad = ({ children, dependencies = [] }) => {
  React.useEffect(() => {
    new Blazy({
      offset: 250,
      selector: '.image',
      successClass: 'lazy-loaded',
      errorClass: 'lazy-failed'
    });
  }, dependencies);
  return <>{children}</>;
}

export default LazyLoad;