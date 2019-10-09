import Radium, {StyleRoot} from 'radium';
import Page from '../layout/Page';

const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    margin: '0 auto',
    padding: '30px 0 0 0'
  }
};

function AboutPage() {
  return (
    <StyleRoot>
      <Page>
        <div style={styles.container}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti,
            eum explicabo ipsam laboriosam quam quas quod vero! At autem deserunt, dolores error in
            nesciunt numquam perferendis perspiciatis rerum, tenetur veniam.
          </p>
        </div>
      </Page>
    </StyleRoot>
  );
}


export default Radium(AboutPage);
