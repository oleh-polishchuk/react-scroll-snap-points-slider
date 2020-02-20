import "./style.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import debounce from "lodash/debounce";
import React, { useEffect, useRef, useState } from "react";
import useEventListener from "./hooks/useEventListener";

const ScrollSnapPointsView = ({ theme, slides, dots, onSlideChanged }) => {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const refs = useRef(slides.map(() => React.createRef()));

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    const handleTouchEvent = debounce(() => {
        if (refs?.current) {
            refs.current.map((ref, index) => {
                setTimeout(((ref, index) => {
                    const clientRect = ref?.current?.getBoundingClientRect();
                    if (clientRect && clientRect.x === 0) {
                        setActiveIndex(index);
                    }
                })(ref, index), 2000);
            });
        }
    }, 1000);

    const scrollIntoView = (element) => {
        if (element) {
            element.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
                inline: "nearest",
            });
        }
    };

    useEffect(() => {
        scrollIntoView(refs.current[ activeIndex ]?.current);
        onSlideChanged(activeIndex);
    }, [ activeIndex, onSlideChanged ]);

    useEventListener(window, "touchend", handleTouchEvent);

    return (
        <section styleName={`container ${theme}`}>

            <div styleName="scroll-items">
                {slides.map((item, index) => {
                    const isActiveIndex = index === activeIndex;

                    return (
                        <div
                            key={index}
                            ref={refs.current[ index ]}
                            styleName={classNames("item", {
                                "item--active": isActiveIndex,
                            })}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>

            {!!dots && (
                <div styleName="thumbs">
                    {slides.map((item, index) => {
                        const isActiveIndex = index === activeIndex;
                        return (
                            <button
                                key={index}
                                styleName={classNames("thumb", {
                                    "thumb--active": isActiveIndex,
                                })}
                                onClick={() => handleDotClick(index)}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
};

ScrollSnapPointsView.themes = [
    "", "theme-free-gift",
];

ScrollSnapPointsView.defaultProps = {
    theme: "",
    dots: true,
};

ScrollSnapPointsView.propTypes = {
    theme: PropTypes.oneOf(ScrollSnapPointsView.themes),
    dots: PropTypes.bool,
    slides: PropTypes.array.isRequired,
    onSlideChanged: PropTypes.func.isRequired,
};

export default ScrollSnapPointsView;
