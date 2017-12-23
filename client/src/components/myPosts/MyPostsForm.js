import React from 'react';
import { deletePost, getMyPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';
import StackGrid from "react-stack-grid";

class MyPostsForm extends React.Component {
  componentWillMount() {
    if(this.props.id && this.props.myPosts.length === 0) {
      this.props.getMyPosts(this.props.id);
    }
  }

  render() {
    return (
      <StackGrid columnWidth={250}>
        {this.props.myPosts.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      </StackGrid>
    );
  }
}

function mapStateToProps(state) {
    return {
      id: state.auth.user.id,
      myPosts: state.postsReducer.myPosts,
    }
}

export default connect(mapStateToProps, {addFlashMessage, getMyPosts, deletePost})(MyPostsForm);
