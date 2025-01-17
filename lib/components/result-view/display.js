/* @flow */

import React from "react";
import { toJS } from "mobx";
import {
  DisplayData,
  ExecuteResult,
  StreamText,
  KernelOutputError,
  Output,
  Media,
  RichMedia
} from "@nteract/outputs";
import PlotlyTransform from "@nteract/transform-plotly";
import { VegaLite1, VegaLite2, Vega2, Vega3 } from "@nteract/transform-vega";

import Markdown from "./markdown";

type Props = { output: any };

// All supported media types for output go here
export const supportedMediaTypes = (
  <RichMedia>
    <Vega3 />
    <Vega2 />
    <PlotlyTransform />
    <VegaLite2 />
    <VegaLite1 />
    <Media.Json />
    <Media.JavaScript />
    <Media.HTML />
    <Markdown />
    <Media.LaTeX />
    <Media.SVG />
    <Media.Image mediaType="image/gif" />
    <Media.Image mediaType="image/jpeg" />
    <Media.Image mediaType="image/png" />
    <Media.Plain />
  </RichMedia>
);

export function isTextOutputOnly(data: Object) {
  const supported = React.Children.map(
    supportedMediaTypes.props.children,
    mediaComponent => mediaComponent.props.mediaType
  );
  const bundleMediaTypes = [...Object.keys(data)].filter(mediaType =>
    supported.includes(mediaType)
  );

  return bundleMediaTypes.length === 1 && bundleMediaTypes[0] === "text/plain"
    ? true
    : false;
}

export default function Display(props: Props) {
  return (
    <Output output={toJS(props.output)}>
      <ExecuteResult expanded>{supportedMediaTypes}</ExecuteResult>
      <DisplayData expanded>{supportedMediaTypes}</DisplayData>
      <StreamText expanded />
      <KernelOutputError expanded />
    </Output>
  );
}
