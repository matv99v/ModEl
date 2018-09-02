import React from 'react';
import { Button } from 'react-bootstrap';

import './FoldableText.scss';

export default class FoldableText extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFolded: true };
    }

    handleFoldClick = () => {
      this.setState({isFolded: !this.state.isFolded});
    }

    render() {
      const foldLabel = this.state.isFolded ? 'Развернуть' : 'Свернуть';
      const arrowDirection = this.state.isFolded ? 'down' : 'up';
      const iconClass = `glyphicon glyphicon-chevron-${arrowDirection}`;

        return (
            <div className='FoldableText__cnt'>
                <div className={this.state.isFolded ? 'FoldableText__box unfolded' : 'FoldableText__box'}>
                    {this.props.children}
                </div>

                {
                  false &&
                  this.state.isFolded &&
                  <div className="FoldableText__fadeout"></div>
                }

                <div className="FoldableText__btnCnt">
                  <Button onClick={this.handleFoldClick}>
                      <span>{foldLabel}</span>
                      <span className={iconClass}></span>
                  </Button>
                </div>



            </div>
        );
    }
}
