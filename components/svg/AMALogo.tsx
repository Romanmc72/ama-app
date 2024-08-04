import { Svg, G, Circle, Path, PathProps, Shape } from 'react-native-svg';
/**
 * The properties required to instantiate the logo.
 */
export interface AMALogoProps {
  /**
   * How many pixels large the image should render as.
   *
   * @default 375
   */
  size?: number;
  /**
   * The color of the background.
   *
   * @default #4f46e5
   */
  backgroundColorHex?: string;
  /**
   * The color of the text.
   *
   * @default #000000
   */
  textColorHex?: string;
  /**
   * The opacity of the shadow. Higher makes the shadow more solid.
   * Allowed range [0-1]
   *
   * @default 0.5
   */
  shadowOpacity?: number;
}

/**
 * Represents the logo for the app that can be rendered in a specific color.
 *
 * @param props The properties to create the component.
 * @return The logo.
 */
export default function AMALogo({
  backgroundColorHex = '#4f46e5',
  textColorHex = '#000000',
  shadowOpacity = 0.5,
  size = 375,
}: AMALogoProps): JSX.Element {
  const straightLetterStyle: Partial<Shape<PathProps>> = {
    fill: textColorHex,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontSize: '33.5338px',
    fontFamily: 'Arial',
    letterSpacing: '0px',
    wordSpacing: '0px',
    strokeWidth: 0.267458,
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 99.218747 99.218753" id="svg8">
      <G id="layer1">
        <G id="g908">
          <G
            id="g914"
            transform="matrix(0.9892536,0,0,0.9892536,-21.856454,-82.053733)"
            strokeWidth={1.01086}>
            <Circle
              fill={backgroundColorHex}
              strokeWidth={1.01086}
              strokeLinecap="round"
              strokeDasharray="1.01086, 1.01086"
              id="path833"
              cx={72.242172}
              cy={133.09338}
              r={50.148289}
            />
            <Path
              d="m 45.34355,164.61159 -2.046741,-5.89462 h -8.792797 l -2.046741,5.89462 h -4.830308 l 8.416198,-23.07086 h 5.698125 l 8.38345,23.07086 z m -6.451326,-19.51772 -0.09824,0.36023 q -0.163739,0.58946 -0.392974,1.34266 -0.229235,0.7532 -2.816315,8.2852 h 6.631439 l -2.275975,-6.63144 -0.704079,-2.22685 z"
              {...straightLetterStyle}
              id="path852"
            />
            <Path
              d="m 72.409648,164.61159 v -13.98333 q 0,-0.47485 0,-0.94969 0.01637,-0.47485 0.163739,-4.07711 -1.162548,4.40459 -1.719262,6.14022 l -4.158977,12.86991 h -3.438524 l -4.158977,-12.86991 -1.75201,-6.14022 q 0.196487,3.79875 0.196487,5.0268 v 13.98333 h -4.289968 v -23.07086 h 6.4677 l 4.126229,12.90265 0.360227,1.24442 0.785948,3.09467 1.031557,-3.70051 4.240847,-13.54123 h 6.434952 v 23.07086 z"
              {...straightLetterStyle}
              id="path854"
            />
            <Path
              d="m 97.494501,164.61159 -2.04674,-5.89462 h -8.792798 l -2.046741,5.89462 h -4.830307 l 8.416197,-23.07086 h 5.698126 l 8.383452,23.07086 z m -6.451326,-19.51772 -0.09824,0.36023 q -0.163739,0.58946 -0.392974,1.34266 -0.229235,0.7532 -2.816315,8.2852 h 6.63144 l -2.275976,-6.63144 -0.704079,-2.22685 z"
              {...straightLetterStyle}
              id="path856"
            />
            <Path
              fill={textColorHex}
              d="m 85.129165,164.55542 3.496466,-0.94034 8.827135,-0.0575 0.613005,0.91358 4.849189,-0.0316 -2.8063,-3.57301 -5.720402,0.0373 -14.058962,3.68283 z m 11.250247,-3.11144 0.01043,0.056 q 0.02013,0.0916 0.06612,0.20857 0.04586,0.11695 0.800878,1.28449 l -6.657358,0.0433 3.906811,-1.0577 1.251481,-0.35479 z"
              opacity={shadowOpacity}
              strokeWidth={0.267458}
              id="path862"
            />
            <Path
              fill={textColorHex}
              d="m 57.957312,164.73235 3.420103,-2.19896 q 0.116138,-0.0747 0.232277,-0.14934 0.100901,-0.0746 0.832891,-0.64008 0.0898,0.68504 0.224165,0.95434 l 1.027443,1.99668 3.451961,-0.0225 7.322996,-2.05106 3.260657,-0.97703 q -1.126437,0.59866 -1.426797,0.79177 l -3.420103,2.19896 4.306717,-0.028 5.642773,-3.62803 -6.492949,0.0423 -7.298147,2.05599 -0.665999,0.19805 -1.545941,0.49179 -0.13048,-0.57518 -0.945448,-2.10172 -6.460088,0.0421 -5.642773,3.62803 z"
              opacity={shadowOpacity}
              strokeWidth={0.267458}
              id="path864"
            />
            <Path
              fill={textColorHex}
              id="path866"
              opacity={shadowOpacity}
              strokeWidth={1}
              d="M 95.941406 292.61523 L 74.552734 292.75586 L 39.0625 302.05273 A 187.5 187.5 0 0 0 42.060547 305.83594 L 53.005859 302.89258 L 86.009766 302.67773 L 88.302734 306.09375 L 106.43359 305.97461 L 95.941406 292.61523 z M 81.998047 294.77539 L 82.037109 294.98438 C 82.08731 295.2127 82.168593 295.47211 82.283203 295.76367 C 82.397514 296.05518 83.395378 297.65619 85.277344 300.56641 L 60.386719 300.72852 L 74.994141 296.77344 L 79.673828 295.44727 L 81.998047 294.77539 z "
              transform="matrix(0.26745754,0,0,0.26745754,22.093884,82.945094)"
            />
            <Path
              d="m 45.34355,164.61159 -2.046741,-5.89462 h -8.792797 l -2.046741,5.89462 h -4.830308 l 8.416198,-23.07086 h 5.698125 l 8.38345,23.07086 z m -6.451326,-19.51772 -0.09824,0.36023 q -0.163739,0.58946 -0.392974,1.34266 -0.229235,0.7532 -2.816315,8.2852 h 6.631439 l -2.275975,-6.63144 -0.704079,-2.22685 z"
              {...straightLetterStyle}
              id="path874"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}
