# Video clips

Source: `ICRA27_5007_VI_i.mp4`, supplied by the project team. The original is read-only and is not needed to build or deploy the website.

The page embeds six independent MP4 files instead of the full video. Title cards and the final summary slide are replaced by webpage headings and text. Clips preserve the original 1920 × 1080 resolution, 48 fps timing, annotations, pauses, and on-screen playback-speed labels. They have no audio. Each clip has its own poster and native playback, seeking, and fullscreen controls; playback is user-initiated.

## Source ranges

Frame ranges are zero-based and end-exclusive. Times are seconds in the source video, rounded here to three decimal places.

| File in `public/media/clips/` | Start frame | End frame | Source time      | Duration |
| ----------------------------- | ----------- | --------- | ---------------- | -------- |
| `reactive-proactive.mp4`      | 424         | 874       | 8.833–18.208 s   | 9.375 s  |
| `xr-intervention.mp4`         | 1018        | 2018      | 21.208–42.042 s  | 20.833 s |
| `preference-learning.mp4`     | 2162        | 2733      | 45.042–56.938 s  | 11.896 s |
| `towel-folding.mp4`           | 2877        | 3453      | 59.938–71.938 s  | 12.000 s |
| `cook-the-carrot.mp4`         | 3453        | 4221      | 71.938–87.938 s  | 16.000 s |
| `lemon-in-the-drawer.mp4`     | 4221        | 4893      | 87.938–101.938 s | 14.000 s |

## Replace a clip

Replace the matching MP4 and JPG in `public/media/clips/`, then update the heading and caption in `src/paper.mdx` if needed. Normal website builds use the committed files directly; FFmpeg is only needed when creating new clips.

To reproduce a clip, use the start and end frames from the table. For example:

```sh
ffmpeg -i "/path/to/ICRA27_5007_VI_i.mp4" \
  -vf "trim=start_frame=1018:end_frame=2018,setpts=PTS-STARTPTS" \
  -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -movflags +faststart -an -map_metadata -1 \
  public/media/clips/xr-intervention.mp4
```

Extract a representative poster from the original source:

```sh
ffmpeg -ss 30 -i "/path/to/ICRA27_5007_VI_i.mp4" \
  -frames:v 1 -vf "scale=1280:-1" -q:v 2 \
  public/media/clips/xr-intervention.jpg
```

The current poster timestamps are 15, 30, 54, 65, 78, and 95 seconds, in the table’s order. Selected rollouts illustrate behavior and should not be presented as aggregate success-rate evidence.
