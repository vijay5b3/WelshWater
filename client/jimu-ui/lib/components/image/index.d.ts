import { React } from 'jimu-core';
import type { StandardComponentProps } from '../types';
/**
 * The Image component props.
 */
export interface ImageProps extends StandardComponentProps {
    /**
     * The shape of the image.
     * @default rectangle
     */
    shape?: 'circle' | 'rectangle';
    /**
     * The width of the image.
     */
    width?: number | string;
    /**
     * The height of the image.
     */
    height?: number | string;
    /**
     * The URL of the image to display.
     */
    src?: string;
    /**
     * The alt text of the image.
     */
    alt?: string;
    /**
     * The fit property specifies how the image should be resized to fit its container.
     * @default fill
     */
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    /**
     * Fired when the image is clicked.
     * @event
     */
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
    /**
     * Fired when the image is loaded.
     */
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
    /**
     * Fired when the image fails to load.
     */
    onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}
/**
 * The Image component is used to display images with different shapes and styles.
 *
 * ```ts
 * import { Image } from 'jimu-ui'
 * ```
 */
export declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
