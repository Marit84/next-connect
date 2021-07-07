import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import Delete from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";

class Comments extends React.Component {
  state = {};

  showComment = comment => {
    const {postUd, auth, classes } = this.props;
    const isCommentCreator = comment.postedBy._id === auth.user._id;

    return (
      <div>
        <Link href={`/profile/${comment.postedBy._id}`}>
          <a>{comment.postedBy.name}</a>
        </Link>
        <br />
        <span className={classes.commentDate}>
          {comment.createdAt}
          {isCommentCreator && (
            <Delete 
            color="secondary"
            className={classes.commentDelete}
            />
          )}
        </span>
      </div>
    )
  }

  render() {
const { auth, comments, classes } = this.props;

    return (
<div className={classes.comments}> 
{/*comment input*/}
<CardHeader 
avatar={<Avatar className={classes.smallAvatar} src={auth.user.avatar} />}
title={
  <form>
    <FormControl
    margin="normal" required fullWidth>
      <Input 
      id="add-comment"
      name="text"
      placeholder="Reply to this post"
      />
    </FormControl>
  </form>
}
className={classes.cardHeader}
/>

{/*comments area*/}
{comments.map(comment => (
  <CardHeader
  key={comment._id}
  avatar={<Avatar className={classes.smallAvatar} src={comment.postedBy.avatar} />}
  title={this.showComment(comment)}
  className={classes.cardHeader}
  />
))}
</div>
    );
  }
}

const styles = theme => ({
  comments: {
    backgroundColor: "rgba(11, 61, 130, 0.06)"
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  smallAvatar: {
    margin: 10
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em"
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer"
  }
});

export default withStyles(styles)(Comments);
