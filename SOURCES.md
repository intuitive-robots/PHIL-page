# Content provenance

All source files were read without changing the manuscript project. The paths below are relative to the original PHIL-ICRA-Submission project, not build-time dependencies. This website builds independently of Overleaf.

| Website asset                       | Manuscript source                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| Title                               | `root.tex`                                                                                 |
| Abstract and summary                | `tex_files/abstract.tex`                                                                   |
| Method and correction-pair details  | `tex_files/method.tex`                                                                     |
| XR setup and timing                 | `tex_files/system_overview.tex`                                                            |
| Tasks, protocol, findings and scope | `tex_files/experiment.tex`                                                                 |
| Framework overview                  | `image/teaser4.png`                                                                        |
| Workspace sequence                  | `figure/phil_example_blur.png`                                                             |
| Diffusion Policy figure             | `image/beso_main_results_lineplot/beso_main_results_lineplot.{png,svg}`                    |
| Correction ablation                 | `image/reactive_proactive_barplot/reactive_proactive_barplot.{png,svg}`                    |
| Recovery analysis                   | `image/recovery_correction/recovery_correction_relationship.{png,svg}`                     |
| Result table snapshots              | `table/beso_main_results.tex`, `table/xvla_comparison.tex`, `table/reactive_proactive.tex` |

The full video is copied from the user-provided `ICRA27_5007_VI_i.mp4`. The MP4 is remuxed with fast-start metadata without re-encoding or cutting. Its duration is 109.916667 seconds, resolution 1920 × 1080, and it contains no audio track. The poster is sampled at 30 seconds. Selected rollouts in the video illustrate behavior and are not a replacement for aggregate evaluation.

The original manuscript acknowledges the use of ChatGPT to polish text and generate some conceptual illustrations, including the framework teaser. This website reuses those supplied figures without generating new scientific artwork.

## Updating source material

Copy updated table files verbatim from the manuscript, and update corresponding figure copies in the same change. Do not edit manuscript files through this website workflow. Verify the generated page before pushing.

The original source-file checksum manifest is retained locally in `verification/source-checksums.json` and excluded from version control. It supports checking that the original inputs have not been altered; it is not uploaded to the website.
